(function() {
  tinymce.create('tinymce.plugins.Shortcodes', {
    init : function(ed, url) {},
    createControl : function(n, cm) {
      if(n=='Shortcodes'){
        var mlb = cm.createListBox('Shortcodes', {
          title : 'Shortcodes',
          onselect : function(v) {
            if(tinyMCE.activeEditor.selection.getContent() == ''){
//              tinyMCE.activeEditor.selection.setContent( v );
            }

            if(v == 'Intro Text'){
              selected = tinyMCE.activeEditor.selection.getContent();
              if( selected ){
                content =  '[intro_text]'+selected+'[/intro_text]';
              } else{
                content =  '[intro_text][/intro_text]';
              }
              tinymce.execCommand('mceInsertContent', false, content);
            }

            if(v == 'Contact Form'){
              content =  '[contact_form]';
              tinymce.execCommand('mceInsertContent', false, content);
            }
            
            if(v == 'Dashboard Icons'){
              content =  '[dashboard_icons]';
              tinymce.execCommand('mceInsertContent', false, content);
            }
            
            if(v == 'Students List'){
              content =  '[students_list]';
              tinymce.execCommand('mceInsertContent', false, content);
            }
            
            if(v == 'File Manager'){
              content =  '[nm-wp-repo]';
              tinymce.execCommand('mceInsertContent', false, content);
            }
            
            
          }
        });


        // Add some menu items
        var my_shortcodes = ['Intro Text', 'Contact Form', 'Dashboard Icons', 'Students List', 'File Manager'];

        for(var i in my_shortcodes)
            mlb.add(my_shortcodes[i],my_shortcodes[i]);

        return mlb;
    }
    return null;
  }
});

  tinymce.PluginManager.add('Shortcodes', tinymce.plugins.Shortcodes);
})();