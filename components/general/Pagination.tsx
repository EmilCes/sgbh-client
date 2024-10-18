import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, totalPages, onPageChange }) => {

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const generatePages = () => {
        const maxVisiblePages = 5;
        const pages: (number | string)[] = [];

        // Calcular los límites dinámicos para las páginas visibles
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // Ajustar el inicio si estamos cerca del final
        const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);

        // Agregar las páginas visibles
        for (let i = adjustedStartPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Agregar puntos suspensivos al inicio si hay más páginas antes
        if (adjustedStartPage > 1) {
            pages.unshift("ellipsis");
        }

        // Agregar puntos suspensivos al final si hay más páginas después
        if (endPage < totalPages) {
            pages.push("ellipsis");
        }

        return pages;
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => handlePageChange(currentPage - 1)}
                        aria-disabled={currentPage === 1}
                    />
                </PaginationItem>

                {generatePages().map((page, index) =>
                    typeof page === "number" ? (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                onClick={() => handlePageChange(page)}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={index}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() => handlePageChange(currentPage + 1)}
                        aria-disabled={currentPage === totalPages}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComponent;