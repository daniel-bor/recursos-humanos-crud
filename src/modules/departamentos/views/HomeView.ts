import { defineComponent } from 'vue';
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue';
import type { Departamento } from '../interfaces/departamento.interface';
import {
  getDepartamentosAction,
  saveDepartamentosAction,
  updateDepartamentosAction,
  deleteDepartamentosAction,
} from '@/modules/departamentos/actions';
import type { Pais } from '@/modules/paises/interfaces/pais.interface';
import { getPaisesAction } from '@/modules/paises/actions';

interface Header {
  title: string;
  align?: string;
  sortable?: boolean;
  key: string;
}

export default defineComponent({
  name: 'HomeView',
  setup() {
    const dialog = ref(false);
    const dialogDelete = ref(false);
    const loading = ref(false);

    const headers: Header[] = [
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
        title: 'Pais',
        align: 'left',
        sortable: true,
        key: 'pais.nombre',
      },
      {
        title: 'Acciones',
        align: 'left',
        sortable: false,
        key: 'actions',
      },
    ];

    const departamentos = ref<Departamento[]>([]);
    const paises = ref<Pais[]>([]);

    const editedIndex = ref<number>(-1);
    const editedItem = reactive<Departamento>({
      nombre: '',
      pais_id: 1,
    });
    const defaultItem: Departamento = {
      nombre: '',
      pais_id: 1,
    };

    const formTitle = computed(() =>
      editedIndex.value === -1 ? 'Nuevo Departamento' : 'Editar Departamento',
    );

    const initialize = async () => {
      const departamentosResponse = await getDepartamentosAction();
      const paisesResponse = await getPaisesAction();
      departamentos.value = departamentosResponse.data;
      paises.value = paisesResponse.data;
    };

    const editItem = (item: Departamento) => {
      editedIndex.value = departamentos.value.indexOf(item);
      Object.assign(editedItem, item);
      dialog.value = true;
    };

    const deleteItem = (item: Departamento) => {
      editedIndex.value = departamentos.value.indexOf(item);
      Object.assign(editedItem, item);
      dialogDelete.value = true;
    };

    const deleteItemConfirm = async () => {
      try {
        const deleteItem = { ...editedItem };
        const deleteResponse = await deleteDepartamentosAction(deleteItem);
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

    const save = async () => {
      try {
        const newDepartamento = { ...editedItem };
        console.log(newDepartamento);
        if (newDepartamento.id) {
          const saveResponse = await updateDepartamentosAction(newDepartamento);
          console.log(saveResponse);
        } else {
          const saveResponse = await saveDepartamentosAction(newDepartamento);
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

    return {
      dialog,
      dialogDelete,
      headers,
      departamentos,
      editedIndex,
      editedItem,
      formTitle,
      loading,
      paises,

      // Methods
      editItem,
      deleteItem,
      deleteItemConfirm,
      close,
      closeDelete,
      save,
    };
  },
});
