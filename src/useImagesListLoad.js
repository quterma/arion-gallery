import { useEffect, useState } from 'react';
import axios from 'axios';

const useImagesListLoad = (pageNumber, limit = 10, isReload) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [imagesList, setImagesList] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		console.log('isReload', isReload)
		setImagesList([]);
	}, [isReload]);

	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;
		axios({
			method: 'GET',
			url: 'https://picsum.photos/v2/list',
			params: { page: pageNumber, limit },
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				setImagesList((prevImageIds) => {
					return [
						...prevImageIds,
						...res.data.map((image) => ({ id: image.id, author: image.author })),
					];
				});
				setHasMore(res.data.length > 0);
				setLoading(false);
			})
			.catch((e) => {
				if (axios.isCancel(e)) return;
				setError(true);
			});
		return () => cancel();
	}, [pageNumber, limit, isReload]);

	return { loading, error, imagesList, hasMore };
};

export default useImagesListLoad;
