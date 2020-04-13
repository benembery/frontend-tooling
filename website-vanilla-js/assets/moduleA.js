export default async function () {
    console.log('Module A!')
    const { b } = await import('./moduleB')

    b();
}
