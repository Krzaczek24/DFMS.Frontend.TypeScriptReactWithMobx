import i18n from "../../i18n"
import { useTranslation } from "react-i18next"
import { Form, InputGroup } from "react-bootstrap"

interface I18nConfig {
    supportedLocales: {
        [key: string]: string
    }
}

const i18nConfig: I18nConfig = {
    supportedLocales: {
        en: "English",
        pl: "Polski",
        ua: "Українська"
    }
}

const renderOption = (value: string, label: string) => {
    return (<option key={value} value={value}>{label}</option>)
}

interface SelectLanuageProps {
    value?: string
    onChange?(value: string): void
}

const SelectLanguage = (props: SelectLanuageProps) => {
    const { t } = useTranslation()
    return (
        <div className="language-container">
            <InputGroup size="lg">
                <InputGroup.Text id="language">
                    {t("common.language")}
                </InputGroup.Text>
                <Form.Select id="change-language-select" size="lg" defaultValue={i18n.language} onChange={e => i18n.changeLanguage(e.target.value)}>
                    {Object.keys(i18nConfig.supportedLocales).sort().map(key => renderOption(key, i18nConfig.supportedLocales[key]))}
                </Form.Select>
            </InputGroup> 
        </div>
    )
}

export default SelectLanguage