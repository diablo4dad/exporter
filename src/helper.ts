function partition<T>(input: T[], size: number): T[][] {
    let output = [];

    for (let i = 0; i < input.length; i += size) {
        output[output.length] = input.slice(i, i + size);
    }

    return output;
}

export { partition };
