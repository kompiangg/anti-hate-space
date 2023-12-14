import Link from "next/link";

export default function Form({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) {
  return (
    <section className="flex-center w-full max-w-full flex-col max-sm:items-start">
      <h1 className="head_text blue_gradient text-left max-sm:mx-2">
        {type} Post
      </h1>

      <p className="desc max-w-md text-center max-sm:mx-2 max-sm:text-left">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7"
      >
        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700">
            Tag {` `}
            <span className="text-sm font-normal">
              (#product, #backend, #database)
            </span>
          </span>

          <input
            type="text"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4 font-bold">
          <Link href="/" className="text-sm text-gray-500">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-primary-orange px-5 py-1.5 text-sm text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}
