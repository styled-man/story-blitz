import { useState } from "react"

interface CheckboxProps {
    label: string
    initialChecked?: boolean
    onCheckedChange?: (checked: boolean, label: string) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ label, initialChecked = false, onCheckedChange }) => {
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
            <input type="checkbox" checked={isChecked} onChange={handleChange} />
            {label}
        </label>
    )
}

export default Checkbox
