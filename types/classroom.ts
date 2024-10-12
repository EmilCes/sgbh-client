export interface Classroom {
    idClassroom: string;
    name: string;
    building: string;
    level: number;
    width: number;
    length: number;
    computerEquipment: number;
    deskWithChair: number;
    currentChairs: number;
    currentTables: number;
    maxChairsCapacity: number;
    maxTablesCapacity: number;
    lamps: number;
    thermalLevel: string;
    airConditioning: boolean;
}