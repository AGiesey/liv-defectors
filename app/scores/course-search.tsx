"use client";
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from 'theme-ui';
import { Field, Box, Label } from 'theme-ui'

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
        <Box as="form" mt={2} onSubmit={(e) => e.preventDefault()}>
            <Label htmlFor="courseSearchInput" mb={1}>Course Name</Label>
            <Field id="courseSearchInput" sx={{width:'25em'}} name="courseSearchInput" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <Button mt={1} onClick={goToResults}>Search</Button>
        </Box>
    )
}