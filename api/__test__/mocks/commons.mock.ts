import { DeleteResult, UpdateResult } from "typeorm"

export const mockUpdatedTypeorm: UpdateResult = {
  generatedMaps: undefined,
  raw: undefined,
  affected: 1
}

export const mockDeletedTypeorm: DeleteResult = {
  raw: undefined,
  affected: 1
}
