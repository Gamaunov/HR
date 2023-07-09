import { Reducer } from '@reduxjs/toolkit';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useStore } from 'react-redux';

import {
	ReduxStoreWithManager,
	StateSchemaKey,
} from 'app/providers/StoreProvider/config/StateSchema';

import { classNames } from 'shared/lib/classNames/classNames';

import cls from './DynamicModuleLoader.module.scss';

export type ReducersList = {
	[name in StateSchemaKey]?: Reducer;
};

type ReducersListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
	reducers: ReducersList;
	removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
	const { children, reducers, removeAfterUnmount } = props;

	const store = useStore() as ReduxStoreWithManager;
	const dispatch = useDispatch();

	useEffect(() => {
		Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
			store.reducerManager.add(name, reducer);
			dispatch({ type: `@INIT ${name} reducer` });
		});

		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(
					([name, reducer]: ReducersListEntry) => {
						store.reducerManager.remove(name);
						dispatch({ type: `@DESTROY ${name} reducer` });
					}
				);
			}
		};
	}, []);

	return <>{children}</>;
};