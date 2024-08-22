import { makeAutoObservable } from "mobx";

export type WidgetSelectItem = {
  id: string;
  label: string;
};
const createInitialItems = (): Map<string, WidgetSelectItem> => {
  const items = new Map<string, WidgetSelectItem>();
  for (let i = 0; i < 150; i++) {
    items.set(`${i}`, { id: `${i}`, label: `Element ${i}` });
  }
  return items;
};

export type RangeFilterId = "0" | "1" | "2" | "3";
type RangeFilter = { id: RangeFilterId; label: string; moreThen: number };
export const rangeFilters: Record<RangeFilterId, RangeFilter> = {
  "0": {
    id: "0",
    label: "No filter",
    moreThen: 0,
  },

  "1": {
    id: "1",
    label: ">10",
    moreThen: 10,
  },

  "2": {
    id: "2",
    label: ">50",
    moreThen: 50,
  },

  "3": {
    id: "3",
    label: ">100",
    moreThen: 100,
  },
};

const MAX_SELECTED_ITEMS = 3;

class SelectWidgetStore {
  private _textSearch: string = "";
  private _rangeFitlerId: RangeFilterId = "0";
  private _items = createInitialItems();
  private _selectedItems = new Map<string, WidgetSelectItem>();
  private _savedItems = new Map<string, WidgetSelectItem>();

  constructor() {
    makeAutoObservable(this);
  }

  toggleSelectedItem(id: string, value: boolean) {
    const item = this._items.get(id);
    if (!item) return;
    if (value) {
      this._selectedItems.set(id, item);
    } else {
      this._selectedItems.delete(id);
    }
  }

  toggleSavedItem(id: string, value: boolean) {
    this.toggleSelectedItem(id, value);
    const item = this._items.get(id);
    if (!item) return;
    if (value) {
      this._savedItems.set(id, item);
    } else {
      this._savedItems.delete(id);
    }
  }

  isSelected(id: string) {
    return this._selectedItems.has(id);
  }

  setRangeFilter(rangeFilterId: RangeFilterId) {
    this._rangeFitlerId = rangeFilterId;
  }

  setTextFitler(text: string) {
    this._textSearch = text;
  }

  save() {
    this._savedItems.clear();
    for (const [id, item] of this._selectedItems) {
      this._savedItems.set(id, item);
    }
  }

  get searchText() {
    return this._textSearch;
  }

  get disabled() {
    return this._selectedItems.size >= MAX_SELECTED_ITEMS;
  }

  get selectedItems() {
    return Array.from(this._selectedItems.values());
  }

  get savedItems() {
    return Array.from(this._savedItems.values());
  }

  get filteredItems() {
    /**
     * Perf optimisation possibility:
     * Add memoization.
     * Trade-off:
     * Auxiliary memory
     */
    const filteredItems = [];
    const itemsList = this._items.values();
    const trimmedSearchText = this._textSearch.trim().toLowerCase();
    let index = 0;
    for (const item of itemsList) {
      let filteredByText = true;
      let filteredByRange = true;
      if (this._textSearch !== "") {
        /**
         * Perf optimisation possibility:
         * Store list of substring in hashmap.
         * Trade-off:
         * Auxiliary memory
         */
        filteredByText = item.label.toLowerCase().includes(trimmedSearchText);
      }

      if (this._rangeFitlerId) {
        const rangeFilter = rangeFilters[this._rangeFitlerId];
        filteredByRange = index > rangeFilter.moreThen;
      }

      if (filteredByRange && filteredByText) {
        filteredItems.push(item);
      }
      index++;
    }
    return filteredItems;
  }
}

export const selectWidgetStore = new SelectWidgetStore();
