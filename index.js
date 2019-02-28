/*
 * Copyright 2018 DoubleDutch, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {PureComponent} from 'react'

function formatDifference (milliseconds) {
  const abs = Math.abs(milliseconds)
  const hours = Math.floor(abs / 1000 / 60 / 60)
  const minutes = Math.floor((abs / 1000 / 60) % 60)
  const seconds = Math.floor((abs / 1000) % 60)

  const hoursText = hours ? `${hours}:` : ''
  const minutesText = `${hours && minutes < 10 ? '0' : ''}${minutes}:`
  const secondsText = `${seconds < 10 ? '0' : ''}${seconds}`
  return hoursText + minutesText + secondsText
}

export default class Timer extends PureComponent {
  constructor(props) {
    super(props)
    const { getTime } = props
    this.state = { time: getTime ? getTime() : new Date() }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { getTime } = this.props
      this.setState({ time: getTime ? getTime() : new Date() })
    }, 200)
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  render() {
    const { targetTime, Wrapper } = this.props
    const { time } = this.state
    const difference = time.valueOf() - (targetTime || new Date()).valueOf()
    const s = formatDifference(difference)
    return Wrapper ? <Wrapper>{s}</Wrapper> : s
  }
}
