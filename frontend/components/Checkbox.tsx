import { randomBytes } from "crypto"
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
    const [randomId] = useState(randomBytes(20).toString("hex"))

    const [isChecked, setIsChecked] = useState<boolean>(initialChecked)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked

        setIsChecked(checked)
        if (onCheckedChange) {
            onCheckedChange(checked, label)
        }
    }

    return (
        <div className="flex items-center justify-start gap-3 font-light">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                disabled={!isChecked && selectedSections.length >= 2}
                id={randomId}
            />
            <label htmlFor={randomId} className="cursor-pointer">
                {label}
            </label>
        </div>
    )
}

export default Checkbox
