import { PrismaClient } from "@prisma/client";
const primsaClient = new PrismaClient()


type ProcedureParams = (string | number | boolean | null)[];

/**
 * Executes a PostgreSQL stored procedure using Prisma.
 * @param procedureName - Name of the stored procedure.
 * @param params - Optional parameters for the procedure.
 * @returns The result of the stored procedure execution.
 */
export const executeStoredProcedure = async (
  procedureName: string,
  params: ProcedureParams = []
): Promise<any> => {
  try {
    const paramPlaceholders = params.map((_, index) => `$${index + 1}`).join(', ');
    
    // If we are passing an array, cast it explicitly
    const query = `SELECT * FROM ${procedureName}($1::integer[])`;

    const result = await primsaClient.$queryRawUnsafe(query, params);

    return result;
  } catch (error) {
    console.error(`Error executing stored procedure ${procedureName}:`, error);
    throw error;
  }
};



  
export default primsaClient

