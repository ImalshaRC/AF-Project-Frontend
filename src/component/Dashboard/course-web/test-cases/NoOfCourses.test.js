const AllCoursesArray = require ('./NoOfCourses');

test('properly clones Array', () => {
    const Array = [0, 1, 2, 3];
    expect(
        AllCoursesArray(Array)
    ).toEqual(Array);
})