/* eslint-env jest */

const { runGrunt, grunt } = require('./utils/grunt')
const { config, file: { expand, readJSON } } = grunt

const buildPath = config('path.build')

describe('Image Size task', () => {
  beforeEach(() => runGrunt(['clean']))

  it('should produce correct data file with defaults for single source', () =>
    runGrunt(['image_size:singleWithDefaults']).then(() =>
      expect(readJSON(buildPath.singleWithDefaults)).toMatchSnapshot()
    )
  )

  it('should produce correct data file with defaults for multiple sources', () =>
    runGrunt(['image_size:multipleWithDefaults']).then(() =>
      expect(readJSON(buildPath.multipleWithDefaults)).toMatchSnapshot()
    )
  )

  it('should produce correct data file with defaults for multiple nested sources', () =>
    runGrunt(['image_size:nestedWithDefaults']).then(() =>
      expect(readJSON(buildPath.nestedWithDefaults)).toMatchSnapshot()
    )
  )

  it('should produce correct data files with defaults for multiple nested expanded sources', () =>
    runGrunt(['image_size:expandedNestedWithDefaults']).then(() => {
      const buildedFilesPaths = expand(
        { filter: 'isFile' },
        `${buildPath.expandedNestedWithDefaults}/**`
      )

      expect(buildedFilesPaths).toMatchSnapshot()

      buildedFilesPaths.forEach((filepath) =>
        expect(readJSON(filepath)).toMatchSnapshot()
      )
    })
  )

  // it('should error on file with error', () =>
  //   expect(runGrunt(['image_size:withError'])).rejects.toBeDefined()
  // )
})
