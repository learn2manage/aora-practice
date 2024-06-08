import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Models } from 'react-native-appwrite';

const useAppwrite = (fn: () => Promise<Models.Document[]>) => {
    //const [data, setData] = useState<Models.Document[]>([]);
    const [data, setData] = useState<Models.Document[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fn();
            setData(res);
        } catch (error) {
            Alert.alert('Error', String(error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => fetchData();

    return { data, loading, refetch };
};

export default useAppwrite;
