import "./LabelListItem.css";

type LabelListItemProps = {
  id: string;
  label: string;
  onRemove: (id: string) => void;
};

export const LabelListItem: React.FC<LabelListItemProps> = ({
  id,
  label,
  onRemove,
}) => {
  const handleRemove = () => {
    onRemove(id);
  };
  return (
    <li className="LabelListItem">
      <div className="LabelListItem__label">{label}</div>
      <button onClick={handleRemove} className="LabelListItem__remove">
        X
      </button>
    </li>
  );
};
