import { location } from './data/location'

// import { job } from './data/job'
export default {
  name: 'app',
  data () {
    return {
      location: location,               // 地区数据
      locationModal: false,             // 地区选择器
      locationValue: '',                // 地区输入框值
      job: job,                         // 职称数据
      jobModal: false,                  // 职称选择器
      jobValue: '',                     // 职称输入框值
      locationSearch: location,         // 地区数据
      locationSearchModal: false,       // 地区选择器
      locationSearchValue: '',          // 地区输入框值
      remoteModal: false,               // 远程选择器
      remoteValue: '',                  // 远程输入框值
      remoteLoading: false,             // 远程loading
      remoteData: [
        {
          'key': 'default_data_1',
          'label': 'default_data_1'
        },
        {
          'key': 'default_data_2',
          'label': 'default_data_2'
        },
        {
          'key': 'default_data_3',
          'label': 'default_data_3'
        },
        {
          'key': 'default_data_4',
          'label': 'default_data_4'
        },
        {
          'key': 'default_data_5',
          'label': 'default_data_5'
        },
        {
          'key': 'tip',
          'label': 'search U.S. states with input'
        }
      ]                                // 远程默认数据
    }
  },
  methods: {
    locationSuccess (data) {
      console.log('success', data)
      this.locationValue = data.pathName.join(',')
    },
    // jobSuccess (data) {
    //   console.log('success', data)
    //   this.jobValue = data.pathName.join(',')
    // },
    locationSearchSuccess (data) {
      console.log('success', data)
      this.locationSearchValue = data.pathName.join(',')
    },
    RemoteSuccess (data) {
      console.log('success', data)
      this.remoteValue = data.pathName.join(',')
    },
    queryChange (val) {
      console.log(val)
    },
    cancel () {
      console.log('cancel')
    },
    open (modal, event) {
      event.target.blur()
      this[modal] = true
    },
    remoteMethod (query) {
      let self = this
      this.remoteLoading = true
      // simulate api call
      setTimeout(function () {
        var remoteMockData = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming']
        var remoteFormatData = []
        self.remoteLoading = false
        remoteFormatData = remoteMockData.map(item => {
          // format the data structure
          return {
            'key': item,
            'label': item
          }
        })
        self.remoteData = remoteFormatData.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
      }, 500)
    }
  }
}
