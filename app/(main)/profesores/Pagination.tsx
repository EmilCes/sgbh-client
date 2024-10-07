import {
    Pagination,
    PaginationContent,
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
                
                {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            href="#"
                            onClick={() => handlePageChange(index + 1)}
                            isActive={currentPage === index + 1}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

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