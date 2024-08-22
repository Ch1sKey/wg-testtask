import { WidgetSelectItem } from "../SelectWIdget/SelectWidgetStore";
import "./LabelsList.css";
import { LabelListItem } from "./LabelsListItem/LabelListItem";

type LabeledListProps = {
  items: WidgetSelectItem[];
  onRemove?: (id: string) => void;
};

export const LabelsList: React.FC<LabeledListProps> = ({ items, onRemove }) => {
  const handleRemove = (id: string) => {
    onRemove?.(id);
  };

  return (
    <ul className="labelsList">
      {items.map((item) => (
        <LabelListItem
          key={item.id}
          id={item.id}
          label={item.label}
          onRemove={handleRemove}
        />
      ))}
    </ul>
  );
};
