import { defineComponent } from 'vue';
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue';
import type { Pais } from '../interfaces/pais.interface';
import {
  getPaisesAction,
  savePaisesAction,
  updatePaisesAction,
  deletePaisesAction,
} from '@/modules/paises/actions';

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
        title: 'Acciones',
        align: 'left',
        sortable: false,
        key: 'actions',
      },
    ];

    const paises = ref<Pais[]>([]);

    const editedIndex = ref<number>(-1);
    const editedItem = reactive<Pais>({
      nombre: '',
    });
    const defaultItem: Pais = {
      nombre: '',
    };

    const formTitle = computed(() => (editedIndex.value === -1 ? 'Nuevo Pais' : 'Editar Pais'));

    const initialize = async () => {
      const paisesResponse = await getPaisesAction();
      paises.value = paisesResponse.data;
    };

    const editItem = (item: Pais) => {
      editedIndex.value = paises.value.indexOf(item);
      Object.assign(editedItem, item);
      dialog.value = true;
    };

    const deleteItem = (item: Pais) => {
      editedIndex.value = paises.value.indexOf(item);
      Object.assign(editedItem, item);
      dialogDelete.value = true;
    };

    const deleteItemConfirm = async () => {
      try {
        const deleteItem = { ...editedItem };
        const deleteResponse = await deletePaisesAction(deleteItem);
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
        const newPais = { ...editedItem };
        console.log(newPais);
        if (newPais.id) {
          const saveResponse = await updatePaisesAction(newPais);
          console.log(saveResponse);
        } else {
          const saveResponse = await savePaisesAction(newPais);
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
      paises,
      editedIndex,
      editedItem,
      formTitle,
      loading,

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
