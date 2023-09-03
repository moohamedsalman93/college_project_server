import { type } from "os"
import { z } from "zod"

export const qSchema = z.object({
    reg: z.string({required_error: "Register Number is required", }),
    dep: z.string({required_error: "dep is required", }),
    courceCode: z.string({required_error: "courceCode is required", }),
    section: z.string({required_error: "Section is required", }),
    exam: z.string({required_error: "exam type is required", }),
    Q1: z.number({required_error: "Q1 mark  is required", }).max(3),
    Q2: z.number({required_error: "Q2 mark is required", }).max(3),
    Q3: z.number({required_error: "Q3 mark is required", }).max(3),
    Q4: z.number({required_error: "Q4 mark is required", }).max(3),
    Q5: z.number({required_error: "Q5 mark is required", }).max(3),
    Q6: z.number({required_error: "Q6 mark is required", }).max(3),
    Q7: z.number({required_error: "Q7 mark is required", }).max(3),
    Q8: z.number({required_error: "Q8 mark is required", }).max(3),
    Q9: z.number({required_error: "Q9 mark is required", }).max(3),
    Q10: z.number({required_error: "Q10 mark is required", }).max(3),
    Q11: z.number({required_error: "Q11 mark is required", }).max(3),
    Q12: z.number({required_error: "Q12 mark is required", }).max(3),
    Q13: z.number({required_error: "Q13 mark is required", }).max(3),
    Q14: z.number({required_error: "Q14 mark is required", }).max(3),
    Q15: z.number({required_error: "Q15 mark is required", }).max(3),
    Q16: z.number({required_error: "Q16 mark is required", }).max(3),
    Q17: z.number({required_error: "Q17 mark is required", }).max(3),
    Q18: z.number({required_error: "Q18 mark is required", }).max(3),
    Q19: z.number({required_error: "Q19 mark is required", }).max(3),
    Q20: z.number({required_error: "Q20 mark is required", }).max(3),
    Q21: z.number({required_error: "Q21 mark is required", }).max(4),
    Q22: z.number({required_error: "Q22 mark is required", }).max(4),
    Q23: z.number({required_error: "Q23 mark is required", }).max(4),
    Q24: z.number({required_error: "Q24 mark is required", }).max(4),
    Q25: z.number({required_error: "Q25 mark is required", }).max(4),
    Q26: z.number({required_error: "Q26 mark is required", }).max(10),
    Q27: z.number({required_error: "Q27 mark is required", }).max(10),
    Q28: z.number({required_error: "Q28 mark is required", }).max(10),
})

export const updateCiaSchema = z.object({
    reg: z.string({required_error: "Register Number is required", }),
    code: z.string({required_error: "code is required", }),
    class: z.string({required_error: "Register Number is required", }).optional(),
    section: z.string({required_error: "Section is required", }).optional(),
    exam: z.string({required_error: "exam type is required", }),
    Q1: z.number().optional(),
    Q2: z.number().optional()
})

export const psoSchema = z.object({
    COS: z.string({required_error: "COS is required (PSO1,PSO2,...,PSO5)", }),
    CO1: z.number(),
    CO2: z.number(),
    CO3: z.number(),
    CO4: z.number(),
    CO5: z.number(),
})

export type qData = z.infer<typeof qSchema>
export type ciaData = z.infer<typeof updateCiaSchema>
export type psoData = z.infer<typeof psoSchema>