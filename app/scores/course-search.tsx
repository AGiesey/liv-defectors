"use client";
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function CourseSearch() {
    const router = useRouter();
    const path = usePathname();
    const [searchValue, setSearchValue] = useState<string>('');

    const goToResults = () => {
        if(searchValue.length < 1) {
            //TODO: show an error;
            return;
        }
        router.push(`${path}/${searchValue}`);
    }

    return (
        <div>
            <label htmlFor="courseSearchInput">Course Name</label>
            <input type="text" id="courseSearchInput" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <button onClick={goToResults}>Search</button>
        </div>
    )
}