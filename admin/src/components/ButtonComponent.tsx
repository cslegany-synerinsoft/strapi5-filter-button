import { Box, Button } from '@strapi/design-system';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom"; //In react-router-dom v6 useHistory() is replaced by useNavigate().
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';
import { useFetchClient } from '@strapi/strapi/admin';
import { PluginSettingsResponse, PluginSettingsBody, SortOrder } from '../../../typings';
import { useIntl } from 'react-intl';
import { getTranslation as getTrad } from '../utils/getTranslation';

const ButtonComponent = ({ name }: { name: string }) => {
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const { contentType, form } = useContentManagerContext();

    const isMounted = useRef(true);
    const { get } = useFetchClient();

    const defaultSettingsBody: PluginSettingsBody[] = [];
    const [settings, setSettings] = useState<PluginSettingsBody[]>(defaultSettingsBody);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await get<PluginSettingsResponse>(`/filter-button/settings`);
            setSettings(data.body);
            setIsLoading(false);
        }
        fetchData();

        // unmount
        return () => {
            isMounted.current = false;
        };
    }, [])

    if (isLoading)
        return <></>;

    //see: https://docs.strapi.io/dev-docs/migration/v4-to-v5/additional-resources/helper-plugin
    const uid = contentType?.uid;
    const { values } = form;

    const currentCollection = settings?.filter(setting => {
        if (setting?.from === uid && setting?.customFieldName === name) return setting
    })[0];
    if (!currentCollection)
        return <></>;

    const filterByValue = values[currentCollection.filterBy];

    const applyFilter = () => {
        const url = `/content-manager/collection-types/${currentCollection.to}?page=1&pageSize=10&sort=${currentCollection.sortBy}:${currentCollection.sortOrder}&filters[$and][0][${currentCollection.manyToMany ? currentCollection.from?.split('.')[1] + 's' : currentCollection.from?.split('.')[1]}][${currentCollection.filterBy}][$eq]=${filterByValue}`;
        console.log("url:", url);
        navigate(url)
    }

    return (
        <>
            <Box paddingTop={5} style={{ width: '100%' }}>
                <Button style={{ margin: 'auto' }} size="L" variant="default" onClick={applyFilter}>
                    {currentCollection.buttonTitle || formatMessage({ id: getTrad("plugin.buttons.view") })}
                </Button>
            </Box>
        </>
    );
};

export default ButtonComponent;