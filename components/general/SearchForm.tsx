import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

interface SearchFormProps {
    onSearch: (searchTerm: string) => void;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        onSearch(searchTerm);
    };

    return (
        <div className="flex items-center gap-4">
            <Input 
                placeholder="Buscar por nombre" 
                className="flex-1 min-w-96 max-w-96" 
                onChange={handleInputChange}
            />
        </div>
    );
};