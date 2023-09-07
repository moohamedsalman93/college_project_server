import express, { Request, Response, response } from 'express';
import { PrismaClient } from '@prisma/client';
import { qSchema } from '../model/results';


const prisma = new PrismaClient();

export const userRouter = express.Router();

userRouter.get("/dep", getDep);
userRouter.get("/courseCode", courseCode);
userRouter.post("/AddResult", AddResult);


async function getDep(req: Request, res: Response) {
    try {

        if (!req.query.question) {
            const fiveResults = await prisma.department.findMany({
                take: 5,
            });
            return res.json(fiveResults);
        }

        let whereCond: any = {};

        if (req.query.question) {
            whereCond.depCode = {
                contains: req.query.question,
            };
        }

        const results = await prisma.department.findMany({
            where: whereCond,
            take: 5,
        });

        return res.json(results);
    } catch (error) {
        console.error('Error fetching results:', error);
        return res.status(500).json({ error: 'An error occurred while fetching results.' });
    }
}

async function courseCode(req: Request, res: Response) {
    try {

        if (!req.query.dep) {
            return res.json({ message: 'Need department Code' });
        }

        if (!req.query.question) {
            let whereCond: any = {
                departmentId: req.query.dep,
            };
            const fiveResults = await prisma.subject.findMany({
                where: whereCond,
                take: 5,
            });
            return res.json(fiveResults);
        }

        let whereCond: any = {
            departmentId: req.query.dep,
            subCode: {
                contains: req.query.question,
            }
        };

        const results = await prisma.subject.findMany({
            where: whereCond,
            take: 5,
        });

        return res.json(results);
    } catch (error) {
        console.error('Error fetching results:', error);
        return res.status(500).json({ error: 'An error occurred while fetching results.' });
    }
}

async function AddResult(req: Request, res: Response) {

    const { dep, reg, courseCode, exam } = req.body;

    let Sid = 0;

    const examData = {
        studentId: 0,
        Q1: req.body.Q1,
        Q2: req.body.Q2,
        Q3: req.body.Q3,
        Q4: req.body.Q4,
        Q5: req.body.Q5,
        Q6: req.body.Q6,
        Q7: req.body.Q7,
        Q8: req.body.Q8,
        Q9: req.body.Q9,
        Q10: req.body.Q10,
        Q11: req.body.Q11,
        Q12: req.body.Q12,
        Q13: req.body.Q13,
        Q14: req.body.Q14,
        Q15: req.body.Q15,
        Q16: req.body.Q16,
        Q17: req.body.Q17,
        Q18: req.body.Q18,
        Q19: req.body.Q19,
        Q20: req.body.Q20,
        Q21: req.body.Q21,
        Q22: req.body.Q22,
        Q23: req.body.Q23,
        Q24: req.body.Q24,
        Q25: req.body.Q25,
        Q26: req.body.Q26,
        Q27: req.body.Q27,
        Q28: req.body.Q28,
        CO1: req.body.Q1 + req.body.Q2 + req.body.Q5 + req.body.Q6 + req.body.Q9 + req.body.Q10 + req.body.Q13 + req.body.Q14 + req.body.Q17 + req.body.Q18,
        CO2: req.body.Q3 + req.body.Q4 + req.body.Q7 + req.body.Q8 + req.body.Q11 + req.body.Q12 + req.body.Q15 + req.body.Q16 + req.body.Q19 + req.body.Q20 + req.body.Q21,
        CO3: req.body.Q22 + req.body.Q23 + req.body.Q26,
        CO4: req.body.Q24 + req.body.Q25 + req.body.Q27,
        CO5: req.body.Q28
    }

    try {

        if (!dep) {
            return res.json({ message: 'Missing department Code' });
        }

        if (!courseCode) {
            return res.json({ message: 'Missing Course Code' });
        }

        const subject = await prisma.subject.findFirst({
            where: {
                departmentId: dep,
                subCode: courseCode,
            },
        });

        if (!subject) {
            return res.json({ message: 'Subject not found' });
        }

        const student = await prisma.student.findFirst({
            where: {
                subjectId: subject.id,
                Regno: {
                    equals: reg
                }
            },
        });


        if (!student) {
            const createStudentData = {
                Regno: reg,
                subjectId: subject.id,
            };

            const createStudent = await prisma.student.create({
                data: createStudentData,
            });

            const examEmptyData = {
                studentId: createStudent.id,
                Q1: 0,
                Q2: 0,
                Q3: 0,
                Q4: 0,
                Q5: 0,
                Q6: 0,
                Q7: 0,
                Q8: 0,
                Q9: 0,
                Q10: 0,
                Q11: 0,
                Q12: 0,
                Q13: 0,
                Q14: 0,
                Q15: 0,
                Q16: 0,
                Q17: 0,
                Q18: 0,
                Q19: 0,
                Q20: 0,
                Q21: 0,
                Q22: 0,
                Q23: 0,
                Q24: 0,
                Q25: 0,
                Q26: 0,
                Q27: 0,
                Q28: 0,
                CO1: 0,
                CO2: 0,
                CO3: 0,
                CO4: 0,
                CO5: 0,
            }

            await prisma.cIA1.create({
                data: examEmptyData,
            });

            await prisma.cIA2.create({
                data: examEmptyData,
            });

            await prisma.eSE.create({
                data: examEmptyData,
            });

            await prisma.totalCIA.create({
                data: {
                    studentId: createStudent.id,
                    CO1: 0,
                    CO2: 0,
                    CO3: 0,
                    CO4: 0,
                    CO5: 0,
                },
            });

            await prisma.assignment.create({
                data: {
                    studentId: createStudent.id,
                    Q1: 0,
                    Q2: 0,
                    CO1: 0,
                    CO2: 0,
                },
            });

            Sid = createStudent.id
            examData['studentId'] = createStudent.id
        }
        else {
            examData['studentId'] = student.id
            Sid = student.id
        }

        if (exam == "CIA1") {

            const checkExam = await prisma.cIA1.findFirst({
                where: {
                    studentId: Sid,
                }
            })

            await prisma.cIA1.update({
                where: {
                    id: checkExam?.id,
                },
                data: examData
            });
        }
        else if (exam == "CIA2") {

            const checkExam = await prisma.cIA2.findFirst({
                where: {
                    studentId: Sid,
                }
            })

            await prisma.cIA2.update({
                where: {
                    id: checkExam?.id,
                },
                data: examData
            });
        }
        else if (exam == "ESE") {

            const checkExam = await prisma.eSE.findFirst({
                where: {
                    studentId: Sid,
                }
            })

            await prisma.eSE.update({
                where: {
                    id: checkExam?.id,
                },
                data: examData
            });
        }
        else if (exam == "ASS1") {
            const checkAss = await prisma.assignment.findFirst({
                where: {
                    studentId: Sid,
                }
            })

            await prisma.assignment.update({
                where: {
                    id: checkAss?.id,
                },
                data: {
                    studentId: Sid,
                    Q1: req.body.Q1,
                    Q2: checkAss?.Q2,
                    CO1: (req.body.Q1) * (5 / 3),
                    CO2: checkAss?.CO2
                }
            });
        }
        else if (exam == "ASS2") {
            const checkAss = await prisma.assignment.findFirst({
                where: {
                    studentId: Sid,
                }
            })

            await prisma.assignment.update({
                where: {
                    id: checkAss?.id,
                },
                data: {
                    studentId: Sid,
                    Q1: checkAss?.Q1,
                    Q2: req.body.Q2,
                    CO1: checkAss?.CO1,
                    CO2: (req.body.Q2) * (5 / 3)
                }
            });
        }

        const cIA1Total = await prisma.cIA1.findFirst({
            where: {
                studentId: Sid,
            }
        })

        const cIA2Total = await prisma.cIA2.findFirst({
            where: {
                studentId: Sid,
            }
        })

        const assignmentTotal = await prisma.assignment.findFirst({
            where: {
                studentId: Sid,
            }
        })

        const getTotal = await prisma.totalCIA.findFirst({
            where: {
                studentId: Sid,
            }
        })


        await prisma.totalCIA.update({
            where: {
                id: getTotal?.id,
            },
            data: {
                studentId: Sid,
                CO1: (cIA1Total?.CO1 || 0) + (cIA2Total?.CO1 || 0) + (assignmentTotal?.CO1 || 0),
                CO2: (cIA1Total?.CO2 || 0) + (cIA2Total?.CO2 || 0) + (assignmentTotal?.CO2 || 0),
                CO3: (cIA1Total?.CO3 || 0) + (cIA2Total?.CO3 || 0),
                CO4: (cIA1Total?.CO4 || 0) + (cIA2Total?.CO4 || 0),
                CO5: (cIA1Total?.CO5 || 0) + (cIA2Total?.CO5 || 0),
            }
        });

        return res.json({ message: 'Student created or already exists' });

    } catch (error) {
        console.error('Error fetching results:', error);
        return res.status(500).json({ error: 'An error occurred while fetching results.' });
    }
}

async function getCourse(req: Request, res: Response) {

    const { dep, courseCode } = req.body

    try {

        if (!dep) {
            return res.json({ message: 'Missing department Code' });
        }

        if (!courseCode) {
            return res.json({ message: 'Missing Course Code' });
        }

        const subject = await prisma.subject.findFirst({
            where: {
                departmentId: dep,
                subCode: courseCode,
            },
        });


        const student = await prisma.student.findMany({
            where: {
                subjectId: subject?.id,
            },
        });


        let above40CO1 = 0;
        let above40CO2 = 0;
        let above40CO3 = 0;
        let above40CO4 = 0;
        let above40CO5 = 0;

        let above40ESECO1 = 0;
        let above40ESECO2 = 0;
        let above40ESECO3 = 0;
        let above40ESECO4 = 0;
        let above40ESECO5 = 0;

        for (const eachStudent of student) {

            //each studentsCiatotal
            const getTotal = await prisma.totalCIA.findFirst({
                where: {
                    studentId: eachStudent.id
                }
            })
            if (getTotal) {
                above40CO1 += getTotal.CO1 > 12 ? 1 : 0;
                above40CO2 += getTotal.CO2 > 16 ? 1 : 0;
                above40CO3 += getTotal.CO3 > 14 ? 1 : 0;
                above40CO4 += getTotal.CO4 > 14 ? 1 : 0;
                above40CO5 += getTotal.CO5 > 8 ? 1 : 0;
            }

            //each studentEse
            const getESE = await prisma.eSE.findFirst({
                where: {
                    studentId: eachStudent.id
                }
            })

            if (getESE) {
                above40ESECO1 += getESE.CO1 > 12 ? 1 : 0;
                above40ESECO2 += getESE.CO2 > 16 ? 1 : 0;
                above40ESECO3 += getESE.CO3 > 14 ? 1 : 0;
                above40ESECO4 += getESE.CO4 > 14 ? 1 : 0;
                above40ESECO5 += getESE.CO5 > 8 ? 1 : 0;
            }

        }

        var percenatgeTotalCia = {
            CO1: (above40CO1 / student.length) * 100,
            CO2: (above40CO2 / student.length) * 100,
            CO3: (above40CO3 / student.length) * 100,
            CO4: (above40CO4 / student.length) * 100,
            CO5: (above40CO5 / student.length) * 100,
        }

        var attainmentLevelsTotalCia = {
            CO1: percenatgeTotalCia.CO1 >= 75 ? 3 : percenatgeTotalCia.CO1 >= 60 ? 2 : percenatgeTotalCia.CO1 >= 40 ? 1 : 0,
            CO2: percenatgeTotalCia.CO2 >= 75 ? 3 : percenatgeTotalCia.CO2 >= 60 ? 2 : percenatgeTotalCia.CO2 >= 40 ? 1 : 0,
            CO3: percenatgeTotalCia.CO3 >= 75 ? 3 : percenatgeTotalCia.CO3 >= 60 ? 2 : percenatgeTotalCia.CO3 >= 40 ? 1 : 0,
            CO4: percenatgeTotalCia.CO4 >= 75 ? 3 : percenatgeTotalCia.CO4 >= 60 ? 2 : percenatgeTotalCia.CO4 >= 40 ? 1 : 0,
            CO5: percenatgeTotalCia.CO5 >= 75 ? 3 : percenatgeTotalCia.CO5 >= 60 ? 2 : percenatgeTotalCia.CO5 >= 40 ? 1 : 0,
        };

        var ESEpercenatge = {
            CO1: (above40ESECO1 / student.length) * 100,
            CO2: (above40ESECO2 / student.length) * 100,
            CO3: (above40ESECO3 / student.length) * 100,
            CO4: (above40ESECO4 / student.length) * 100,
            CO5: (above40ESECO5 / student.length) * 100,
        }

        var ESEattainmentLevels = {
            CO1: ESEpercenatge.CO1 >= 75 ? 3 : ESEpercenatge.CO1 >= 60 ? 2 : ESEpercenatge.CO1 >= 40 ? 1 : 0,
            CO2: ESEpercenatge.CO2 >= 75 ? 3 : ESEpercenatge.CO2 >= 60 ? 2 : ESEpercenatge.CO2 >= 40 ? 1 : 0,
            CO3: ESEpercenatge.CO3 >= 75 ? 3 : ESEpercenatge.CO3 >= 60 ? 2 : ESEpercenatge.CO3 >= 40 ? 1 : 0,
            CO4: ESEpercenatge.CO4 >= 75 ? 3 : ESEpercenatge.CO4 >= 60 ? 2 : ESEpercenatge.CO4 >= 40 ? 1 : 0,
            CO5: ESEpercenatge.CO5 >= 75 ? 3 : ESEpercenatge.CO5 >= 60 ? 2 : ESEpercenatge.CO5 >= 40 ? 1 : 0,
        };

        let overAll = {
            CO1: (attainmentLevelsTotalCia.CO1 + ESEattainmentLevels.CO1) / 2,
            CO2: (attainmentLevelsTotalCia.CO2 + ESEattainmentLevels.CO2) / 2,
            CO3: (attainmentLevelsTotalCia.CO3 + ESEattainmentLevels.CO3) / 2,
            CO4: (attainmentLevelsTotalCia.CO4 + ESEattainmentLevels.CO4) / 2,
            CO5: (attainmentLevelsTotalCia.CO5 + ESEattainmentLevels.CO5) / 2,
        }

        let averageAttain = (overAll.CO1 + overAll.CO2 + overAll.CO3 + overAll.CO4 + overAll.CO5) / 5

        let direct80 = (80 * averageAttain) / 100

        res.status(200).json({
            success: {
                message: "Total calculated and added successfully",

                above40CO1,
                above40CO2,
                above40CO3,
                above40CO4,
                above40CO5,
                percenatgeTotalCia,
                attainmentLevelsTotalCia,


                above40ESECO1,
                above40ESECO2,
                above40ESECO3,
                above40ESECO4,
                above40ESECO5,
                ESEpercenatge,
                ESEattainmentLevels,

                overAll,
                averageAttain,
                direct80,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: {
                message: "Internal server error",
            },
        });
    }

}

