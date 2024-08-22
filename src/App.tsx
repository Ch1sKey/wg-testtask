import { useState } from "react";
import "./App.css";
import { SelectWidget } from "./components/SelectWIdget/SelectWidget";
import { Button } from "./components/Button/Button";
import { observer } from "mobx-react-lite";
import { selectWidgetStore } from "./components/SelectWIdget/SelectWidgetStore";
import { LabelsList } from "./components/LabelsList/LabelsList";

export const App = observer(() => {
  const [showSelectWidget, setShowSelectedWidget] = useState(true);
  const savedItems = selectWidgetStore.savedItems;
  const handleOpenWidget = () => {
    setShowSelectedWidget(true);
  };
  const handleCloseWidget = () => {
    setShowSelectedWidget(false);
  };
  const handleRemoveSaveItems = (id: string) => {
    selectWidgetStore.toggleSavedItem(id, false);
  };

  return (
    <div className="main">
      <h2>Select items</h2>
      <div className="main__data">
        <div>Currently you have {savedItems.length} selected items.</div>
        <LabelsList items={savedItems} onRemove={handleRemoveSaveItems} />
        <div>
          <Button onClick={handleOpenWidget}>Change my choice</Button>
        </div>
      </div>
      <div className="main__widget-contaner">
        {showSelectWidget && <SelectWidget onClose={handleCloseWidget} />}
      </div>
    </div>
  );
});
