import React, { useState } from 'react';
import {
    Flex,
    Field,
    TextInput,
} from '@strapi/design-system';
import { useIntl } from "react-intl";
import { getTranslation as getTrad } from '../utils/getTranslation';
import SettingsTooltip from './SettingsTooltip';
import { Information } from '@strapi/icons';

interface SettingsCardTextFieldProps {
    index: number,
    name: string;
    placeholder: string;
    required: boolean;
    value: string;
    updateItem: (index: number, fieldName: string, value: string) => void,
}

const SettingsCardTextField = ({ index, name, placeholder, required, value, updateItem }: SettingsCardTextFieldProps) => {
    const { formatMessage } = useIntl();
    const [hasError, setHasError] = useState(false);

    const onItemChange = (newValue: string) => {
        setHasError(required && !newValue);
        updateItem(index, name, newValue);
    }

    return (
        <Field.Root name={`field_${name}`} required={required}
            error={hasError ? formatMessage({ id: getTrad("plugin.settings.errors.required") }) : ""}
            hint={formatMessage({ id: getTrad(`plugin.settings.${name}.hint`) })}>
            <Field.Label>
                {formatMessage({ id: getTrad(`plugin.settings.${name}`) })}
            </Field.Label>
            <Flex size={12}>
                <TextInput
                    name={name}
                    placeholder={placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onItemChange(e.target.value)}
                    value={value}
                />
                <SettingsTooltip tooltip={`plugin.settings.${name}.tooltip`}>
                    <Information />
                </SettingsTooltip>
            </Flex>
            <Field.Hint />
            <Field.Error />
        </Field.Root>
    );
}

export default SettingsCardTextField;