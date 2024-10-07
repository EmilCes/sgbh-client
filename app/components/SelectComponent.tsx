import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectComponent = () => {
  return (

    <Select>
      <SelectTrigger id="framework">
        <SelectValue placeholder="Seleccionar" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="next">Aula Normal</SelectItem>
        <SelectItem value="sveltekit">Laboratorio</SelectItem>
        <SelectItem value="astro">Auditorio</SelectItem>
      </SelectContent>
    </Select>

  )
}

export default SelectComponent