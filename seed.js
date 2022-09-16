const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

(async () => {
    for(let i = 0; i < 20; i++) {
        await prisma.animal.create({
            data: {
                name: 'Lorem',
                description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis. In massa tempor nec feugiat nisl. Sed felis eget velit aliquet sagittis id consectetur purus ut. Justo nec ultrices dui sapien eget mi proin.',
                age: 1,
                type: 'dog',
                gender: 'male',
                status: 'good',
                location: 'shumen',
                images: []
            }
        });
    }
    await prisma.animal.create({
        data: {
            name: 'Peter',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis. In massa tempor nec feugiat nisl. Sed felis eget velit aliquet sagittis id consectetur purus ut. Justo nec ultrices dui sapien eget mi proin.',
            age: 1,
            type: 'dog',
            gender: 'male',
            status: 'good',
            location: 'shumen',
            images: []
        }
    });
})()
