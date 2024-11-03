import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface FilterFormProps {
    onSearch: (searchTerm: string) => void;
    onRowsChange: (rows: number) => void;
}

export const FilterForm = ({ onSearch, onRowsChange }: FilterFormProps) => {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        onSearch(searchTerm);
    };

    const handleRowsChange = (value: string) => {
        const rows = parseInt(value, 10);
        onRowsChange(rows);
    }

    return (
        <div className="flex items-center gap-4">
            <Input
                placeholder="Buscar por nombre"
                className="flex-1 min-w-96 max-w-96"
                onChange={handleInputChange}
            />
            <div className="min-w-96 max-w-96">
                <Select onValueChange={handleRowsChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Numero de filas" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Filas</SelectLabel>
                            <SelectItem value="7">7</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

        </div>
    );
};