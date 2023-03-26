import { useState } from "react"

interface CheckboxProps {
    label: string
    initialChecked?: boolean
    onCheckedChange?: (checked: boolean, label: string) => void
    selectedSections: string[]
}

const Checkbox: React.FC<CheckboxProps> = ({
    label,
    initialChecked = false,
    onCheckedChange,
    selectedSections,
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(initialChecked)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked

        setIsChecked(checked)
        if (onCheckedChange) {
            onCheckedChange(checked, label)
        }
    }

    return (
        <label>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                disabled={!isChecked && selectedSections.length >= 2}
            />
            {label}
        </label>
    )
}

export default Checkbox
