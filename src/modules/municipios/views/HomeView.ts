import { defineComponent } from 'vue';
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue';
import type { Municipio } from '../interfaces/municipio.interface';
import {
  getMunicipiosAction,
  saveMunicipiosAction,
  updateMunicipiosAction,
  deleteMunicipiosAction,
} from '@/modules/municipios/actions';
import type { Departamento } from '@/modules/departamentos/interfaces/departamento.interface';
import { getDepartamentosAction } from '@/modules/departamentos/actions';

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
        title: 'Departamento',
        align: 'left',
        sortable: true,
        key: 'departamento.nombre',
      },
      {
        title: 'Acciones',
        align: 'left',
        sortable: false,
        key: 'actions',
      },
    ];

    const municipios = ref<Municipio[]>([]);
    const departamentos = ref<Departamento[]>([]);

    const editedIndex = ref<number>(-1);
    const editedItem = reactive<Municipio>({
      nombre: '',
      departamento_id: 1,
    });
    const defaultItem: Municipio = {
      nombre: '',
      departamento_id: 1,
    };

    const formTitle = computed(() =>
      editedIndex.value === -1 ? 'Nuevo Municipio' : 'Editar Municipio',
    );

    const initialize = async () => {
      const municipiosResponse = await getMunicipiosAction();
      const departamentosResponse = await getDepartamentosAction();
      municipios.value = municipiosResponse.data;
      departamentos.value = departamentosResponse.data;
    };

    const editItem = (item: Municipio) => {
      editedIndex.value = municipios.value.indexOf(item);
      Object.assign(editedItem, item);
      dialog.value = true;
    };

    const deleteItem = (item: Municipio) => {
      editedIndex.value = municipios.value.indexOf(item);
      Object.assign(editedItem, item);
      dialogDelete.value = true;
    };

    const deleteItemConfirm = async () => {
      try {
        const deleteItem = { ...editedItem };
        const deleteResponse = await deleteMunicipiosAction(deleteItem);
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
        const newMunicipio = { ...editedItem };
        console.log(newMunicipio);
        if (newMunicipio.id) {
          const saveResponse = await updateMunicipiosAction(newMunicipio);
          console.log(saveResponse);
        } else {
          const saveResponse = await saveMunicipiosAction(newMunicipio);
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
      municipios,
      editedIndex,
      editedItem,
      formTitle,
      loading,
      departamentos,

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
