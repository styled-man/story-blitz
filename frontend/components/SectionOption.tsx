export default function Option({
    name,
    onChange,
    checked,
    isDisabled,
}: {
    name: string
    onChange: (e: { currentTarget: { checked: boolean } }) => void
    checked: boolean
    isDisabled: boolean
}) {
    return (
        <div className="text-lg flex items-center gap-5">
            <input
                className="w-[20px] h-[20px] aspect-square"
                type="checkbox"
                id={name}
                name={name}
                checked={checked}
                onChange={onChange}
                disabled={!checked && isDisabled}
            />
            <label htmlFor={name}>{name}</label>
        </div>
    )
}
