export default function() {
    console.log('Module A!')
    import('./moduleB').then(({default: b}) => b())
}
