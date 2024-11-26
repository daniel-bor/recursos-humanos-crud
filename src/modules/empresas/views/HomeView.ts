import { defineComponent } from 'vue';
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue';
import type { Empresa } from '../interfaces/empresa.interface';
import {
  getEmpresasAction,
  saveEmpresasAction,
  updateEmpresasAction,
  deleteEmpresasAction,
} from '@/modules/empresas/actions';
import type { Pais } from '@/modules/paises/interfaces/pais.interface';
import { getPaisesAction } from '@/modules/paises/actions';
import { getDepartamentosAction } from '@/modules/departamentos/actions';
import { getMunicipiosAction } from '@/modules/municipios/actions';
import type { Departamento } from '@/modules/departamentos/interfaces/departamento.interface';
import type { Municipio } from '@/modules/municipios/interfaces/municipio.interface';

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
        title: 'Nombre Comercial',
        align: 'left',
        sortable: true,
        key: 'nombre_comercial',
      },
      {
        title: 'Razon Social',
        align: 'left',
        sortable: true,
        key: 'razon_social',
      },
      {
        title: 'Nit',
        align: 'left',
        sortable: true,
        key: 'nit',
      },
      {
        title: 'Pais',
        align: 'left',
        sortable: true,
        key: 'pais.nombre',
      },
      {
        title: 'Telefono',
        align: 'left',
        sortable: true,
        key: 'telefono',
      },
      {
        title: 'Correo Electronico',
        align: 'left',
        sortable: true,
        key: 'correo',
      },
      {
        title: 'Municipio',
        align: 'left',
        sortable: true,
        key: 'municipio.nombre',
      },
      {
        title: 'Departamento',
        align: 'left',
        sortable: true,
        key: 'departamento.nombre',
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

    const empresas = ref<Empresa[]>([]);
    const paises = ref<Pais[]>([]);
    const departamentos = ref<Departamento[]>([]);
    const municipios = ref<Municipio[]>([]);

    const editedIndex = ref<number>(-1);
    const editedItem = reactive<Empresa>({
      nombre_comercial: '',
      razon_social: '',
      nit: '',
      telefono: '',
      correo: '',
      municipio_id: 1,
      departamento_id: 1,
      pais_id: 1,
    });
    const defaultItem: Empresa = {
      nombre_comercial: '',
      razon_social: '',
      nit: '',
      telefono: '',
      correo: '',
      municipio_id: 1,
      departamento_id: 1,
      pais_id: 1,
    };

    const formTitle = computed(() =>
      editedIndex.value === -1 ? 'Nuevo Empresa' : 'Editar Empresa',
    );

    const initialize = async () => {
      const empresasResponse = await getEmpresasAction();
      const paisesResponse = await getPaisesAction();
      const departamentosResponse = await getDepartamentosAction();
      const municipiosResponse = await getMunicipiosAction();
      empresas.value = empresasResponse.data;
      paises.value = paisesResponse.data;
      departamentos.value = departamentosResponse.data;
      municipios.value = municipiosResponse.data;
    };

    const editItem = (item: Empresa) => {
      editedIndex.value = empresas.value.indexOf(item);
      Object.assign(editedItem, item);
      dialog.value = true;
    };

    const deleteItem = (item: Empresa) => {
      editedIndex.value = empresas.value.indexOf(item);
      Object.assign(editedItem, item);
      dialogDelete.value = true;
    };

    const deleteItemConfirm = async () => {
      try {
        const deleteItem = { ...editedItem };
        const deleteResponse = await deleteEmpresasAction(deleteItem);
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
        const newEmpresa = { ...editedItem };
        console.log(newEmpresa);
        if (newEmpresa.id) {
          const saveResponse = await updateEmpresasAction(newEmpresa);
          console.log(saveResponse);
        } else {
          const saveResponse = await saveEmpresasAction(newEmpresa);
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
      empresas,
      editedIndex,
      editedItem,
      formTitle,
      loading,
      paises,
      departamentos,
      municipios,

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
