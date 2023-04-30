import { App } from 'octokit'

const privateKey = process.env.GITHUB_PRIVATE_KEY.replace(/\\n/g, '\n')

const app = new App({
  appId: 321462,
  privateKey,
})

export async function getStats(req, res) {
  const { user, repo } = req.query

  if (!user || !repo) {
    return res.status(400).send('Missing params')
  }

  const {
    data: { id: installationId },
  } = await app.octokit.request(`/users/${user}/installation`)

  const octokit = await app.getInstallationOctokit(installationId)

  const {
    repository: {
      languages: { edges, totalSize },
      url,
    },
  } = await octokit.graphql(
    `query languages($user: String!, $repo: String!) {
    repository(owner: $user, name: $repo) {
        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
                node {
                    color
                    name
                }
                size
            }
            totalSize
        }
        url
    }
}`,
    {
      user,
      repo,
    }
  )

  const languages = Object.values(edges).map(
    ({ node: { name, color }, size }) => ({
      name,
      color,
      size: (size / totalSize) * 100,
    })
  )

  res.send({
    languages,
    url,
  })
}
