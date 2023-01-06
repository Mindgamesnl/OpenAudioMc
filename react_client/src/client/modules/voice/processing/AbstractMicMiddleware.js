export class AbstractMicMiddleware {

    unlink() {
        throw new Error("Not implemented")
    }

    link(context, from, to) {
        throw new Error("Not implemented")
    }

}