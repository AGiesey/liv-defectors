'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/page.module.scss';

export default function Forum({ params }: { params: { id: number } }) {
    const router = useRouter();
    const postExists = false;

    useEffect(() => {
        if(!postExists) {
            router.replace('/404');
        }
    }, [])


    return (
        <main className={styles.main}>
            <h1>FORUM</h1>
            <p>{params.id}</p>
        </main>
    )
}