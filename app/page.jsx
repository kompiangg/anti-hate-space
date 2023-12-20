import Feed from '@components/Feed'

export default function HomePage() {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Komunitas Positif
                <br />
                <span className="purple_gradient text-center"> Tanpa Ujaran Kebencian</span>
            </h1>
            <p className="desc text-center mb-12">
                Kinder merupakan media sosial dengan teknologi penyaring ujaran kebencian berbasis AI, menciptakan lingkungan aman dan nyaman bagi pengguna untuk bertukar pikiran.
            </p>

            <Feed />
        </section>
    )
}
