import "./SelectListItem.css";

type SelectListItemProps = {
  text: string;
  id: string;
  checked: boolean;
  disabled: boolean;
  onChange: (id: string, checked: boolean) => void;
};

export const SelectListItem: React.FC<SelectListItemProps> = ({
  text,
  id,
  onChange,
  checked,
  disabled,
}) => {
  const handleChange = () => {
    onChange(id, !checked);
  };
  return (
    <div className="selectWidget__item">
      <label className="selectWidget__item__label">
        <input
          disabled={!checked && disabled}
          checked={checked}
          onChange={handleChange}
          type="checkbox"
        />{" "}
        <span>{text}</span>
      </label>
    </div>
  );
};
