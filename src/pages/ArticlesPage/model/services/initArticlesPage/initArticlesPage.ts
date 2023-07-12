import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

export const initArticlesPage = createAsyncThunk<
	void,
	void,
	ThunkConfig<string>
>('articlesPage/initArticlesPage', async (_, thunkApi) => {
	const { getState, dispatch } = thunkApi;
	const inited = getArticlesPageInited(getState());

	if (!inited) {
		dispatch(articlesPageActions.initState());
		dispatch(
			fetchArticlesList({
				page: 1,
			})
		);
	}
});
