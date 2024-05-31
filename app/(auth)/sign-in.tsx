import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';

const SignIn = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const submit = async () => {
        if (form.email === '' || form.password === '') {
            Alert.alert('Error', 'Please fill in all fields');
        }
        setSubmitting(true);

        setSubmitting(false);
        router.replace('/home');
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center h-full px-4 my-6 ">
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        className="w-[115px] h-[35px]"
                    />
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold ">
                        Log in to Aora
                    </Text>
                    <FormField
                        title="Email"
                        value={form.email}
                        placeholder="Your email address"
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        placeholder="Password"
                        handleChangeText={(e) =>
                            setForm({ ...form, password: e })
                        }
                        otherStyles="mt-7"
                    />
                    <CustomButton
                        title="Sign In"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
