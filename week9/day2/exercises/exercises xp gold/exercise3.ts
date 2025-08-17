class MathUtils {
    static PI = 3.14159;

    static circumference(radius: number): number {
        return 2 * MathUtils.PI * radius;
    }
}

console.log(MathUtils.circumference(5));