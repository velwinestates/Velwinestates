import { useEffect, useState } from 'react';
import { apiUrl } from '../api';

export default function usePageMedia(page) {
  const [media, setMedia] = useState({});

  useEffect(() => {
    let active = true;
    fetch(apiUrl(`/api/site-media/${page}`))
      .then(response => response.ok ? response.json() : {})
      .then(data => {
        if (active && data && typeof data === 'object') setMedia(data);
      })
      .catch(() => {});

    return () => { active = false; };
  }, [page]);

  return media;
}
