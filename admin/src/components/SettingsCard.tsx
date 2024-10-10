import React from 'react';
import {
    Flex,
    Field,
    Box,
    Grid,
    Typography,
    Toggle,
    Card,
    CardHeader,
    CardBody,
    CardContent,
    CardBadge,
    Combobox,
    ComboboxOption,
    IconButton,
} from '@strapi/design-system';

import { Trash } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { getTranslation as getTrad } from '../utils/getTranslation';
import { PluginSettingsBody, SortOrder } from '../../../typings';
import SettingsCardTextField from './SettingsCardTextField';

interface SettingsCardProps {
    setting: PluginSettingsBody,
    index: number,
    onSubmit: () => void,
    onAddCard: () => void,
    onRemoveCard: (index: number) => void,
    updateItem: (index: number, fieldName: string, value: string) => void,
    updateManyToMany: (index: number, value: boolean) => void,
    updateSortOrderChange: (index: number, value: SortOrder) => void,
}

const SettingsCard = (props: SettingsCardProps) => {
    const { setting, index, onRemoveCard, updateItem, updateManyToMany, updateSortOrderChange } = props;
    const { formatMessage } = useIntl();

    const sortOrderOptions = Object.values(SortOrder);

    const convertFieldName = (name: string, defaultValue: string) => {
        if (!name)
            return defaultValue;

        const lastDotIdx = name.lastIndexOf("."); //convert "api::category.category" to "category"
        if (lastDotIdx === -1)
            return name;

        return name.slice(lastDotIdx + 1);
    }

    const convertFieldNames = () => {
        const from = convertFieldName(setting.from, "FROM");
        const to = convertFieldName(setting.to, "TO");
        return `${from} -> ${to}`;
    }

    return (
        <Grid.Item col={6} s={12}>
            <Box padding={2}>
                <Card style={{
                    width: '480px'
                }}>
                    <CardHeader>
                        <Box paddingBottom={2} paddingTop={2} width={'100%'}                                                >
                            <Flex justifyContent="space-between">
                                <Typography>
                                    <CardBadge>{convertFieldNames()}</CardBadge>
                                </Typography>
                                <Box paddingRight={1}>
                                    <IconButton withTooltip={false} variant="secondary" onClick={() => onRemoveCard(index)}>
                                        <Trash />
                                    </IconButton>
                                    {/* <Button startIcon={<Trash />} onClick={() => onRemoveCard(index)}>
                                        {formatMessage({ id: getTrad('plugin.settings.buttons.remove') })}
                                    </Button> */}
                                </Box>
                            </Flex>
                        </Box>

                    </CardHeader>
                    <CardBody>
                        <CardContent>
                            <Grid.Root gap={6}>
                                <Grid.Item col={6} s={12}>
                                    <Box paddingBottom={6}>
                                        <SettingsCardTextField index={index} name='from' placeholder='From'
                                            required={true} updateItem={updateItem} value={setting.from} />
                                    </Box>
                                </Grid.Item>
                                <Grid.Item col={6} s={12}>
                                    <Box paddingBottom={6}>
                                        <SettingsCardTextField index={index} name='to' placeholder='To'
                                            required={true} updateItem={updateItem} value={setting.to} />
                                    </Box>
                                </Grid.Item>
                                <Grid.Item col={6} s={12}>
                                    <Box paddingBottom={6}>
                                        <SettingsCardTextField index={index} name='customFieldName' placeholder='Custom Field Name'
                                            required={true} updateItem={updateItem} value={setting.customFieldName} />
                                    </Box>
                                </Grid.Item>
                                <Grid.Item col={6} s={12}>
                                    <Box paddingBottom={6}>
                                        <SettingsCardTextField index={index} name='buttonTitle' placeholder='Button Title'
                                            required={false} updateItem={updateItem} value={setting.buttonTitle} />
                                    </Box>
                                </Grid.Item>
                                <Grid.Item col={6} s={12}>
                                    <Box paddingBottom={6}>
                                        <SettingsCardTextField index={index} name='filterBy' placeholder='Filter By'
                                            required={true} updateItem={updateItem} value={setting.filterBy} />
                                    </Box>
                                </Grid.Item>
                                <Grid.Item col={6} s={12}>
                                    <Box paddingBottom={6}>
                                        <SettingsCardTextField index={index} name='sortBy' placeholder='Sort By'
                                            required={true} updateItem={updateItem} value={setting.sortBy} />
                                    </Box>
                                </Grid.Item>
                                <Grid.Item col={6} s={12}>
                                    <Box paddingBottom={6}>
                                        <Field.Root name="field_manyToMany" hint={formatMessage({ id: getTrad("plugin.settings.manyToMany.hint") })}>
                                            <Field.Label>
                                                {formatMessage({ id: getTrad('plugin.settings.manyToMany') })}
                                            </Field.Label>
                                            <Toggle
                                                checked={setting.manyToMany}
                                                onLabel={formatMessage({ id: getTrad("plugin.settings.buttons.yes") })}
                                                offLabel={formatMessage({ id: getTrad("plugin.settings.buttons.no") })}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    updateManyToMany(index, e.target.checked)
                                                }
                                            />
                                            <Field.Hint />
                                        </Field.Root>
                                    </Box>
                                </Grid.Item>
                                <Grid.Item col={6} s={12}>
                                    <Box paddingBottom={6}>
                                        <Field.Root name="field_sortOrder" hint={formatMessage({ id: getTrad("plugin.settings.sortOrder.hint") })}>
                                            <Field.Label>
                                                {formatMessage({ id: getTrad('plugin.settings.sortOrder') })}
                                            </Field.Label>
                                            <Combobox
                                                onClear={() => updateSortOrderChange(index, SortOrder.ASC)}
                                                onChange={(e: SortOrder) => updateSortOrderChange(index, e)}
                                                placeholder="Sort Order"
                                                value={setting.sortOrder}
                                            >
                                                {sortOrderOptions.map((key) => (
                                                    <ComboboxOption value={key} key={key}>
                                                        {key}
                                                    </ComboboxOption>
                                                ))}
                                            </Combobox>
                                            <Field.Hint />
                                        </Field.Root>
                                    </Box>
                                </Grid.Item>
                            </Grid.Root>
                        </CardContent>
                    </CardBody>
                </Card>
            </Box>
        </Grid.Item>
    )
}

export default SettingsCard;