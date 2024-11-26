import { defineComponent } from 'vue';
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue';
import type { Colaborador } from '../interfaces/colaborador.interface';
import {
  getColaboradoresAction,
  saveColaboradoresAction,
  updateColaboradoresAction,
  deleteColaboradoresAction,
} from '@/modules/colaboradores/actions';
import type { Empresa } from '@/modules/empresas/interfaces/empresa.interface';
import { getEmpresasAction } from '@/modules/empresas/actions';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const dialog = ref(false);
    const dialogDelete = ref(false);
    const loading = ref(false);

    const headers = [
      {
        title: 'ID',
        align: 'left',
        sortable: true,
        key: 'id',
      },
      {
        title: 'Nombre',
        align: 'left',
        sortable: true,
        key: 'nombre',
      },
      {
        title: 'Edad',
        align: 'left',
        sortable: true,
        key: 'edad',
        value: (item: Colaborador) => {
          if (!item.fecha_nacimiento) return '';
          const [year, month, day] = item.fecha_nacimiento.split(' ')[0].split('-');
          const birthDate = new Date(+year, +month - 1, +day);
          const diff = Date.now() - birthDate.getTime();
          const age = new Date(diff).getUTCFullYear() - 1970;
          return age + ' años';
        },
      },
      {
        title: 'Teléfono',
        align: 'left',
        sortable: true,
        key: 'telefono',
      },
      {
        title: 'Correo',
        align: 'left',
        sortable: true,
        key: 'correo',
      },
      {
        title: 'Empresas',
        align: 'left',
        sortable: true,
        key: 'empresas',
        value: (item: Colaborador) =>
          (item.empresas ?? []).map((e) => e.nombre_comercial).join(', '),
      },
      {
        title: 'Acciones',
        align: 'left',
        sortable: false,
        key: 'actions',
      },
    ];

    const rules = {
      required: (value: string) => !!value || 'Este campo es requerido',
      email: (value: string) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(value) || 'Correo inválido';
      },
      phone: (value: string) => {
        const pattern = /^\d{4}-\d{4}$/;
        return pattern.test(value) || 'Teléfono inválido';
      },
      min: (v: string) => v.length >= 8 || 'Mínimo 8 caracteres',
      date: (value: string) =>
        /^\d{2}-\d{2}-\d{4}$/.test(value) || 'El formato debe ser DD-MM-YYYY',
      max_10: (v: string) => v.length <= 10 || 'No puede ser mayor a 10',
    };

    const colaboradores = ref<Colaborador[]>([]);
    const empresas = ref<Empresa[]>([]);

    const editedIndex = ref<number>(-1);
    const editedItem = reactive<Colaborador>({
      nombre: '',
      telefono: '',
      correo: '',
      fecha_nacimiento: '',
      empresa_ids: [],
    });
    const defaultItem: Colaborador = {
      nombre: '',
      telefono: '',
      correo: '',
      fecha_nacimiento: '',
      empresa_ids: [],
    };

    const formTitle = computed(() =>
      editedIndex.value === -1 ? 'Nuevo Colaborador' : 'Editar Colaborador',
    );

    const initialize = async () => {
      const colaboradoresResponse = await getColaboradoresAction();
      const empresasResponse = await getEmpresasAction();
      colaboradores.value = colaboradoresResponse.data;
      empresas.value = empresasResponse.data;
    };

    const formatToDDMMYYYY = (date: string): string => {
      if (!date) return '';
      const [year, month, day] = date.split(' ')[0].split('-'); // Divide la fecha y toma solo la parte `YYYY-MM-DD`
      return `${day}-${month}-${year}`;
    };

    const editItem = (item: Colaborador) => {
      editedIndex.value = colaboradores.value.indexOf(item);
      Object.assign(editedItem, {
        ...item,
        empresa_ids: Array.isArray(item.empresa_ids)
          ? item.empresa_ids
          : (item.empresas ?? []).map((empresa) => empresa.id), // Calcula los IDs si es necesario
        fecha_nacimiento: formatToDDMMYYYY(item.fecha_nacimiento ?? ''), // Formatea la fecha
      });
      dialog.value = true;
    };

    const deleteItem = (item: Colaborador) => {
      editedIndex.value = colaboradores.value.indexOf(item);
      Object.assign(editedItem, item);
      dialogDelete.value = true;
    };

    const deleteItemConfirm = async () => {
      try {
        const deleteItem = { ...editedItem };
        const deleteResponse = await deleteColaboradoresAction(deleteItem);
        console.log(deleteResponse);
        initialize();
        closeDelete();
      } catch (error) {
        console.error(error);
      }
    };

    const close = () => {
      dialog.value = false;
      nextTick(() => {
        Object.assign(editedItem, defaultItem);
        editedIndex.value = -1;
      });
    };

    const closeDelete = () => {
      dialogDelete.value = false;
      nextTick(() => {
        Object.assign(editedItem, defaultItem);
        editedIndex.value = -1;
      });
    };

    const formatToYYYYMMDD = (date: string): string => {
      if (!date) return '';
      const [day, month, year] = date.split('-');
      return `${year}-${month}-${day} 00:00:00`;
    };

    const save = async () => {
      try {
        const newColaborador = {
          ...editedItem,
          fecha_nacimiento: formatToYYYYMMDD(editedItem.fecha_nacimiento || ''),
        };
        console.log(newColaborador);

        if (newColaborador.id) {
          const saveResponse = await updateColaboradoresAction(newColaborador);
          console.log(saveResponse);
        } else {
          const saveResponse = await saveColaboradoresAction(newColaborador);
          console.log(saveResponse);
        }
        initialize();
        close();
      } catch (error) {
        console.error(error);
      }
    };

    watch(dialog, (val) => {
      if (!val) close();
    });

    watch(dialogDelete, (val) => {
      if (!val) closeDelete();
    });

    onMounted(() => {
      initialize();
    });

    const formatDate = (value: string) => {
      try {
        // Asegúrate de que `value` sea una cadena
        const sanitizedValue = (value || '').replace(/[^\d]/g, '');

        // Divide en partes (día, mes, año)
        const day = sanitizedValue.slice(0, 2);
        const month = sanitizedValue.slice(2, 4);
        const year = sanitizedValue.slice(4, 8);

        // Construye el formato con separadores
        let formatted = day;
        if (month) formatted += `-${month}`;
        if (year) formatted += `-${year}`;

        // Actualiza el valor en tiempo real
        editedItem.fecha_nacimiento = formatted;
      } catch (error) {
        console.error(error);
      }
    };

    // Vincula `fecha_nacimiento` con el campo formateado
    const formattedDate = computed({
      get: () => editedItem.fecha_nacimiento,
      set: (value: string) => formatDate(value),
    });

    return {
      dialog,
      dialogDelete,
      headers,
      colaboradores,
      editedIndex,
      editedItem,
      formTitle,
      loading,
      empresas,
      rules,

      // Methods
      editItem,
      deleteItem,
      deleteItemConfirm,
      close,
      closeDelete,
      save,

      // Utils
      formattedDate,
      formatDate,
    };
  },
});
