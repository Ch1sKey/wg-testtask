import { observer } from "mobx-react-lite";
import { SelectListItem } from "./SelectListItem/SelectListItem";
import "./SelectWidget.css";
import {
  RangeFilterId,
  rangeFilters,
  selectWidgetStore,
} from "./SelectWidgetStore";
import { ChangeEvent } from "react";
import { Button } from "../Button/Button";
import { LabelsList } from "../LabelsList/LabelsList";

type SelectWidgetProps = {
  onClose: () => void;
};

export const SelectWidget = observer(({ onClose }: SelectWidgetProps) => {
  const items = selectWidgetStore.filteredItems;
  const selectedItems = selectWidgetStore.selectedItems;
  const disabled = selectWidgetStore.disabled;

  const handleSave = () => {
    selectWidgetStore.save();
    onClose();
  };
  const handleClose = () => {
    onClose();
  };
  const handleCheck = (id: string, value: boolean) => {
    selectWidgetStore.toggleSelectedItem(id, value);
  };
  const handleSearchType = (event: ChangeEvent<HTMLInputElement>) => {
    /**
     * Perf optimisation possibility:
     * Debounce search.
     * Trade-off:
     * App responsiveness and UX might suffer.
     */
    selectWidgetStore.setTextFitler(event.target.value);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    selectWidgetStore.setRangeFilter(event.target.value as RangeFilterId);
  };

  const handleSelectItemsRemove = (id: string) => {
    selectWidgetStore.toggleSelectedItem(id, false);
  };

  return (
    <div className="selectWidget">
      <header>
        <div className="selectWidget__header">
          <div className="selectWidget__label">Select items</div>
          <button onClick={handleClose} className="selectWidget__close">
            X
          </button>
        </div>
      </header>
      <div className="selectWidget__filters">
        <div className="selectWidget__filterItem">
          <label className="selectWidget__label">Search</label>
          <input
            onChange={handleSearchType}
            value={selectWidgetStore.searchText}
            className="selectWidget__filterInput"
            type="text"
          />
        </div>
        <div className="selectWidget__filterItem">
          <label className="selectWidget__label">Filter</label>
          <select
            onChange={handleFilterChange}
            className="selectWidget__filterInput"
            defaultValue={0}
          >
            {Object.values(rangeFilters).map((filter) => (
              <option key={filter.id} value={filter.id}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <main className="selectWidget__main">
        <div className="selectWidget__itemsList">
          {/* /**
           * Perf optimisation possibility:
           * Use vistual list.
           * Trade-off:
           * Fast could become problematic
           * Default browser search would not work
           */}
          {items.map((item) => (
            <SelectListItem
              id={item.id}
              key={item.id}
              text={item.label}
              disabled={disabled}
              checked={selectWidgetStore.isSelected(item.id)}
              onChange={handleCheck}
            />
          ))}
        </div>
        <div className="selectWidget__selectedItems">
          <div className="selectWidget__label">Current selected items:</div>
          <LabelsList
            items={selectedItems}
            onRemove={handleSelectItemsRemove}
          />
        </div>
      </main>
      <footer className="selectWidget__footer">
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleClose} red>
          Cancel
        </Button>
      </footer>
    </div>
  );
});
