/**
 * buildlyone content types.
 *
 * Every word rendered on the site lives in this module. If a string
 * appears in a component file, it is a bug.
 *
 * This file has no runtime exports. It exists so editors and readers
 * can see the shape of the content before touching it.
 */

/**
 * @typedef {object} Anchor
 * @property {string} label
 * @property {string} href   Always an in-page '#id'.
 */

/**
 * A story we tell about a problem.
 *
 * `kind` is 'illustrative' and nothing else. buildlyone has no client
 * work, so the only honest story is a labelled composite. Rendering is
 * gated on this field: ProblemDetail refuses to render a story without
 * its disclosure caption, which is what keeps the composite honest.
 *
 * @typedef {object} Story
 * @property {'illustrative'} kind
 * @property {string} disclosure  Mono caption, always rendered above the story.
 * @property {string} setting     Generic descriptor. Never a nameable company.
 * @property {string[]} body      Present tense. Ends on the cost, not the fix.
 */

/**
 * @typedef {object} BuildItem
 * @property {string} title
 * @property {string} detail
 * @property {string[]} stack  Renders mono. This is where services live, demoted.
 */

/**
 * How you would know the work succeeded. Forward-looking, never a claim
 * about past results.
 *
 * @typedef {object} Metric
 * @property {string} name
 * @property {string} definition      What exactly is counted. Removes weasel room.
 * @property {string} howMeasured     By whom, at what cadence.
 * @property {string} baselineSource  Where the before-number comes from.
 */

/**
 * @typedef {object} Refusal
 * @property {string} statement
 * @property {string} reason  One sentence. Must cost us something real.
 */

/**
 * @typedef {object} Problem
 * @property {string} id
 * @property {string} number
 * @property {string} symptom    The owner's own sentence, not a noun phrase.
 * @property {string} villain    The concrete thing that is broken.
 * @property {string[]} signal   Observable facts. Recognition, not persuasion.
 * @property {string} priorityReason  Why the cost compounds rather than sits flat.
 * @property {Story} story
 * @property {string[]} investigationQuestions
 * @property {string[]} evidenceToGather
 * @property {BuildItem[]} whatWeBuild
 * @property {Metric[]} metrics
 * @property {Refusal[]} avoid
 * @property {string[]} relatedMethodSteps  Ids into method.steps.
 */

/**
 * @typedef {object} MethodStat
 * @property {string} value
 * @property {string} label
 * @property {string} verifiableBy  How a reader confirms this without trusting us.
 */

/**
 * @typedef {object} MethodStep
 * @property {string} id
 * @property {string} number      Decimal: '1.0', '1.1', '2.0'.
 * @property {string} title
 * @property {string} statement   One-sentence assertion. The scannable layer.
 * @property {string[]} [body]
 * @property {string[]} [questions]
 * @property {string[]} [rulesOut]
 * @property {string} [deliverable]
 * @property {string} [duration]
 */

/**
 * @typedef {object} Person
 * @property {string} id
 * @property {string} name
 * @property {string} role
 * @property {string} focus  6-12 words on discipline. Not a project history.
 */

/**
 * @typedef {object} Field
 * @property {string} name  Wire name sent to /api/send.
 * @property {string} label
 * @property {'text'|'email'|'textarea'} type
 * @property {boolean} required
 * @property {string} [hint]
 * @property {number} [maxLength]
 * @property {string} [autoComplete]
 */

export {};
