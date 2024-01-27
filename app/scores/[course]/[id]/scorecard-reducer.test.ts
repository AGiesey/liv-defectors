import scorecardReducer, {buildDefaultScorecard, ActionTypes} from "./scorecard-reducer";
//TODO use path alias' in jest too
import mockCourses from '../../../../api-utilities/dummy-data/hunters-ridge-search.json';
import { Course } from '../../../../types/course';
describe('scorecard-reducer', () => {
    let mockCourse: Course;
    beforeEach(() => {
        mockCourse = {...mockCourses[0]}
    })
    describe('buildDefaultScorecard', () => {
        
        // This is mostly just a sanity check for all the following tests
        test('ensure required fields exist', () => {
            
            const expectedDate = new Date();
            const expectedCourseName = mockCourse.name;
            const expectedPlusMinus = 0;
            const expectedScore = 0;
            const requiredFieldsPlusNineHoles = 13;

            const actual = buildDefaultScorecard(mockCourse);

            expect(actual.date).toEqual(expectedDate);
            expect(actual.course).toEqual(expectedCourseName);
            expect(actual.plusMinus).toEqual(expectedPlusMinus);
            expect(actual.strokes).toEqual(expectedScore);
            expect(actual.playerName).toBeUndefined;
            expect(actual.tee).toBeUndefined;
            expect(Object.keys(actual).length).toBeGreaterThanOrEqual(requiredFieldsPlusNineHoles);
        })
    })
    test('add player name', () => {
        const scorecard = buildDefaultScorecard(mockCourse);
        const expected = "John Daily";
        const actual = scorecardReducer(scorecard, {type: ActionTypes.UPDATE_PLAYER_NAME, payload: expected});
        expect(actual.playerName).toEqual(expected);
    })
    test('add scores', () => {
        const scorecard = buildDefaultScorecard(mockCourse);
        let actual = scorecardReducer(scorecard, {type: ActionTypes.UPDATE_STROKES, payload: {hole: 1, strokes: 5}});
        actual = scorecardReducer(actual, {type: ActionTypes.UPDATE_STROKES, payload: {hole: 2, strokes: 6}});

        actual = scorecardReducer(actual, {type: ActionTypes.UPDATE_STROKES, payload: {hole: 4, strokes: 7}});

        expect(actual[1].strokes).toEqual(5);
        expect(actual[2].strokes).toEqual(6);
        expect(actual[4].strokes).toEqual(7);
        expect(actual[3].strokes).toBeUndefined();
    })

    describe('calculate totals', () => {
        test('no holes have been played', () => {
            const scorecard = buildDefaultScorecard(mockCourse);
            const expectedPlusMinus = 0;
            const expectedStrokes = 0;
            const actual = scorecardReducer(scorecard, {type: ActionTypes.UPDATE_STROKES, payload: {}});
            expect(actual.plusMinus).toEqual(expectedPlusMinus);
            expect(actual.strokes).toEqual(expectedStrokes);
        })
        test.each([
            [Number.MAX_VALUE, Number.MAX_VALUE - 4],
            [5, 1],
            [4, 0],
            [3, -1],
            [0, 0]
        ])('Shot %i on first hole', (strokes, expectedPlusMinus) => {
            const scorecard = buildDefaultScorecard(mockCourse);
            const hole = 1;

            const actual = scorecardReducer(scorecard, {type: ActionTypes.UPDATE_STROKES, payload: {hole, strokes: strokes}});
            
            expect(actual.plusMinus).toEqual(expectedPlusMinus);
            expect(actual.strokes).toEqual(strokes);
        })
        
        test('play an entire 9', () => {
            const scorecard = buildDefaultScorecard(mockCourse);
            const expectedPlusMinus = 4;
            const expectedStrokes = 39;
            
            // simulating the under-the-hood stuff that keeps track of the state. 
            let actual = scorecardReducer(scorecard, {type: ActionTypes.UPDATE_STROKES, payload: {hole: 1, strokes: 4}});
            actual = scorecardReducer(actual, {type: ActionTypes.UPDATE_STROKES, payload: {hole: 2, strokes: 5}});
            actual = scorecardReducer(actual, {type: ActionTypes.UPDATE_STROKES, payload: {hole: 3, strokes: 4}});
            actual = scorecardReducer(actual, {type: ActionTypes.UPDATE_STROKES, payload: {hole: 4, strokes: 3}});
            actual = scorecardReducer(actual, {type: ActionTypes.UPDATE_STROKES, payload: {hole: 5, strokes: 5}});
            actual = scorecardReducer(actual, {type: ActionTypes.UPDATE_STROKES, payload: {hole: 6, strokes: 5}});
            actual = scorecardReducer(actual, {type: ActionTypes.UPDATE_STROKES, payload: {hole: 7, strokes: 3}});
            actual = scorecardReducer(actual, {type: ActionTypes.UPDATE_STROKES, payload: {hole: 8, strokes: 5}});
            actual = scorecardReducer(actual, {type: ActionTypes.UPDATE_STROKES, payload: {hole: 9, strokes: 5}});
            
            expect(actual.plusMinus).toEqual(expectedPlusMinus);
            expect(actual.strokes).toEqual(expectedStrokes);
        })
    })
    describe('invalid inputs', () => {
        test('strokes as a non-integer or a non-positive integer', () => {
            const scorecard = buildDefaultScorecard(mockCourse);
            let actual = scorecardReducer(scorecard, {type: ActionTypes.UPDATE_STROKES, payload: {hole: 1, strokes: "H"}});
            actual = scorecardReducer(actual, {type: ActionTypes.UPDATE_STROKES, payload: {hole: 2, strokes: 1.2}})
            actual = scorecardReducer(actual, {type: ActionTypes.UPDATE_STROKES, payload: {hole: 3, strokes: 0}})

            expect(actual[1].strokes).toBeUndefined();
            expect(actual[2].strokes).toBeUndefined();
            expect(actual[3].strokes).toBeUndefined();
        })
        test('it doesnt add a non existent hole', () => {
            const scorecard = buildDefaultScorecard(mockCourse);
            const expectedLength = Object.keys(scorecard).length;

            let actual = scorecardReducer(scorecard, {type: ActionTypes.UPDATE_STROKES, payload: {hole: "Bazinga!", strokes: 3}});
            expect(Object.keys(actual).length).toEqual(expectedLength);
        })
    })
})